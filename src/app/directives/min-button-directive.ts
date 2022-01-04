import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, merge, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Point } from '../../app/interfaces/point';
import { Circle } from '../../app/interfaces/circle';

// Mouse pointer button variable assigned to 0 initially.
const MOUSE_PRIMARY = 0;

@Directive({
  selector: '[minCircularSliderButton]',
})
export class minCircularSliderButtonDirective implements OnInit {
  /*
   * Defines an element as a property with a type HTMLElement, which refers to a given HTML element when called.
   * Defines elementStartSubscription as a Subscription class which subscribes to the mousedown$ observable.
   * Defines elementMoveSubscription as a Subscription class which subscribes to the mousemove$ and mouseup$ observables.
   */
  private element: HTMLElement;
  private elementStartSubscription?: Subscription;
  private elementMoveSubscription?: Subscription;

  /*
   * Declares the initial property _angle of type number equal to 0.
   */
  private _angle: number = 0;

  /*
   * Declares the initial property circleRadius of type number, equal to 0.
   * Declares the initial property minButtonDiameter of type number, equal to 0.
   */
  private windowStart?: Point;
  // private layerLatestDelta?: any = 0;
  private circleRadius: number = 0;
  private minButtonDiameter: number = 0;

  /*
   * Creates an input decorator called diameter and assigns it a value of 0.
   */
  @Input()
  diameter?: number = 0;

  /*
   * Creates an input decorator that returns the current angle from the set(angle deg: number) setter method.
   */
  @Input()
  get angle() {
    return this._angle;
  }

  /*
   * Whenever there is a change in the angle value.
   * The angle value equals the current position of the min button.
   * Which is then emitted through the angleChange output decorator.
   */
  set angle(position: number) {
    this._angle = position || 0;
    this.setTransform(this.calcMinButtonPosition(this._angle));
    this.angleChange.emit(this._angle);
  }

  /*
   * Creates an output decorator angleChange.
   * Which enables the min-button component to listen to the change in the value of the angle.
   * Then bind to it.
   */
  @Output()
  angleChange = new EventEmitter<number>();

  constructor(
    /*
     * The injectable service called ngZone.
     * Where the component uses mouse events.
     * Then the event changes do not take place in run-time Angular.
     * Which increases performance.
     */
    private ngZone: NgZone,
    // Declares a property called elementRef with a wrapper ElementRef.
    private elementRef: ElementRef
  ) {
    // A wrapper around the native dom elements for the handler and angle value field.
    this.element = this.elementRef.nativeElement;
  }

  /*
   * On initialisation handles the logic related to the minimum button.
   * Along with the mousedown logic.
   */
  ngOnInit(): void {
    this.minButtonPosition();
    this.registerStart(this.element);
  }

  /*
   * When minButtonPosition() is called.
   * Size the button.
   * Then position the button equal to the angle value of the circle.
   */
  private minButtonPosition() {
    this.minButtonDiameter = this.diameter! / 7;
    this.circleRadius = this.diameter! / 2;
    this.element.style.width = `${this.minButtonDiameter}px`;
    this.element.style.height = `${this.minButtonDiameter}px`;
    this.element.style.top = `${
      this.circleRadius - this.minButtonDiameter / 2
    }px`;
    this.element.style.left = `${
      this.circleRadius - this.minButtonDiameter / 2
    }px`;
    this.setTransform(this.calcMinButtonPosition(this.angle));
  }

  /*
   * When registerStart() is called.
   * Then call the mousedown$ observable which handles the initial mousedown event.
   * When a user pressers the mouse button over the minimum button element.
   * Then filter through mouse events and confirm that the mouse device has been clicked.
   * And remove interference from native and/or other draggable parents.
   * Then map the current (x,y) window coordinates of the minimum button.
   * Also, subscribe to the mousedown$ observable.
   * Where if the user is no longer pressing down on the button.
   * Then unregisterStart() is called which subscribes from the event.
   */
  private registerStart(element: HTMLElement) {
    this.unregisterStart();
    this.ngZone.runOutsideAngular(() => {
      const mousedown$ = fromEvent<MouseEvent>(element, 'mousedown').pipe(
        filter((event) => event.button === MOUSE_PRIMARY),
        tap((event) => {
          // Avoids interference by "native" dragging of <img> tags.
          if (event.target && (event.target as HTMLElement).draggable) {
            event.preventDefault();
          }
          // avoid triggering other draggable parents.
          event.stopPropagation();
        }),
        map((event) => parseMouseEvent(event))
      );
      this.elementStartSubscription = merge(mousedown$).subscribe(
        (windowStart) => {
          this.dragStart(windowStart);
        }
      );
    });
  }

  /*
   * Unsubscribes from the mousedown$ observable when elementStartSubscription is true.
   */
  private unregisterStart() {
    if (this.elementStartSubscription) {
      this.elementStartSubscription.unsubscribe();
      this.elementStartSubscription = undefined;
    }
  }

  /*
   * When registerMove() is called.
   * Then call the mousemove$ observable which handles the initial mousemove event.
   * Remove interference from "native" and dragging.
   * Then map the current (x,y) window coordinates of the minimum button.
   * Also call the mouseup$ observable which handles the initial mouseup event
   * Then add initial teardown subscription logic to elementMoveSubscription.
   * Which subscribes to both observables.
   * Where if the user is no longer moving the button and mouse button is up.
   * The min button stops.
   * Then unregisterMove() is called which subscribes from the events.
   */
  private registerMove() {
    this.unregisterMove();
    this.elementMoveSubscription = new Subscription();

    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
      tap((event) => {
        // Avoids interference by "native" dragging of <img> tags.
        event.preventDefault();
      }),
      map((event) => parseMouseEvent(event))
    );
    this.elementMoveSubscription.add(
      merge(mousemove$).subscribe((windowStart) => {
        this.dragMove(windowStart);
      })
    );

    const mouseup$ = fromEvent<void>(document, 'mouseup');
    this.elementMoveSubscription.add(
      merge(mouseup$).subscribe(() => {
        this.dragStop();
      })
    );
  }

  /*
   * Unsubscribes from the mouseup$ and mousemove$ observable if elementMoveSubscription is true.
   */
  private unregisterMove() {
    if (this.elementMoveSubscription) {
      this.elementMoveSubscription.unsubscribe();
      this.elementMoveSubscription = undefined;
    }
  }

  /*
   * When dragStart is called.
   * Assign the (x,y) coordinates to windowPoint to windowStart.
   * And call registerMove() to handle the sliding of the button.
   */
  private dragStart(windowPoint: Point) {
    this.windowStart = windowPoint;
    this.registerMove();
  }

  /*
   * When dragMove is called.
   * Assign the value of the calMinButtonAngle relative to the circle circumference to angle.
   * Then round that value to the nearest integer.
   */
  private dragMove(windowPoint: Point) {
    const angle = this.calcMinButtonAngle(windowPoint);

    this.ngZone.run(() => {
      this.angle = Math.round(angle);
    });
  }

  /*
   * When calcMinButtonAngle is called.
   * Set angle initially to 0.
   * Then calculate the offset.
   * Mouse position.
   * Then the angle in radians between the point = (x,y) coordinates and the positive X axis.
   * And assign the angle to an negative atan divided by (pi / 180 ) plus 180.
   * Then return angle.
   */
  private calcMinButtonAngle(windowPoint: Point) {
    let angle = 0;
    if (this.diameter) {
      const offset = this.circleRadius - this.minButtonDiameter / 2;
      const mousePos: Point = {
        x: windowPoint.x - offset - 1070 + this.minButtonDiameter,
        y: windowPoint.y - offset - 360 + this.minButtonDiameter,
      };
      const aTan = Math.atan2(
        mousePos.x - this.circleRadius,
        mousePos.y - this.circleRadius
      );
      angle = -aTan / (Math.PI / 180) + 180;
    }

    return angle;
  }

  /*
   * When calcMinButtonPosition is called.
   * Then calculate the current (x,y) coordinates of the min button relative to the circumference of the invisible circle.
   */
  private calcMinButtonPosition(angle: number): Point {
    const newX = this.circleRadius * Math.sin((angle * Math.PI) / 180);
    const newY = this.circleRadius * -Math.cos((angle * Math.PI) / 180);

    return {
      x: newX,
      y: newY,
    };
  }

  /*
   * When dragStop is called.
   * Stop the min button in its current position along the circumference of the invisible circle.
   */
  private dragStop() {
    this.unregisterMove();
  }

  /*
   * When setTransform is called.
   * Move the min button from its current position based on its (x,y) coordinates.
   */
  private setTransform(point: Point) {
    this.element.style.transform = `translate(${point.x}px, ${point.y}px)`;
  }
}

/*
 * When parseMouseEvent is called.
 * Then assign the current (x,y) coordinates for a given mouse event.
 */
function parseMouseEvent(event: MouseEvent): Point {
  return {
    x: event.pageX,
    y: event.pageY,
  };
}

/*
 * TODO:
 * Minimum button logic where it can only be dragged clockwise from angles 220 to 140 and anti-clockwise from 140 - 220.
 * Logic that removes the ability for the min button to overlap the max button.
 * Logic that sets the angle 220 as the lowest possible value of 0  and the angle 140 as the highest possible value of 100.
 * Mouse position x and y coordinates maintain the correct position relative to page zoom in or zoom out states.
 */
