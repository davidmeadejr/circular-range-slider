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

const MOUSE_PRIMARY = 0;

@Directive({
  selector: '[maxCircularSliderButton]',
})
export class maxCircularSliderButtonDirective implements OnInit {
  private element: HTMLElement;
  private elementStartSubscription?: Subscription;
  private elementMoveSubscription?: Subscription;

  private _angle: number = 0;

  private windowStart?: Point;
  private layerLatestDelta?: any = 0;
  private circleRadius: number = 0;
  private maxButtonDiameter: number = 0;

  @Input()
  diameter?: number;

  @Input()
  get angle() {
    return this._angle;
  }

  @Output()
  angleChange = new EventEmitter<number>();

  set angle(deg: number) {
    this._angle = deg || 0;
    this.setTransform(this.calcMaxButtonPosition(this._angle));
    this.angleChange.emit(this._angle);
  }

  constructor(
    /*
     * The injectable service ngZone is used to optimize performance as multiple asynchronous tasks are used in this directive
     * that do not require UI updates or error handling by Angular.
     */
    private ngZone: NgZone,
    // Assigns the wrapper ElementRef to elementRef.
    private elementRef: ElementRef
  ) {
    // A wrapper around the native dom elements for the handler and angle value field.
    this.element = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.maxButtonPosition();
    this.registerStart(this.element);
  }

  /*
   * Sets the size of the min button and positions it on the circumference of the circle.
   */
  private maxButtonPosition() {
    this.maxButtonDiameter = this.diameter! / 7;
    this.circleRadius = this.diameter! / 2;
    this.element.style.width = `${this.maxButtonDiameter}px`;
    this.element.style.height = `${this.maxButtonDiameter}px`;
    this.element.style.top = `${
      this.circleRadius - this.maxButtonDiameter / 2
    }px`;
    this.element.style.left = `${
      this.circleRadius - this.maxButtonDiameter / 2
    }px`;
    this.setTransform(this.calcMaxButtonPosition(this.angle));
  }

  /*
   * Calls the observable mousedown$ which handles all movement of the handles when the mouse button is pressed.
   */
  private registerStart(element: HTMLElement) {
    this.unregisterStart();
    this.ngZone.runOutsideAngular(() => {
      const mousedown$ = fromEvent<MouseEvent>(element, 'mousedown').pipe(
        filter((event) => event.button === MOUSE_PRIMARY),
        tap((event) => {
          // Avoids interference by "native dragging of <img> tags.
          if (event.target && (event.target as HTMLElement).draggable) {
            event.preventDefault();
          }
          // avoid triggering other draggable parents.
          event.stopPropagation();
        }),
        map((event) => parseMouseEvent(event))
      );
      this.elementStartSubscription = merge(mousedown$).subscribe(
        (windowPoint) => {
          this.dragStart(windowPoint);
        }
      );
    });
  }

  /*
   * Unsubscribes from the mousedown$ observable if elementStartSubscription is true.
   */
  private unregisterStart() {
    if (this.elementStartSubscription) {
      this.elementStartSubscription.unsubscribe();
      this.elementStartSubscription = undefined;
    }
  }

  /*
   * Calls the observable mousemove$ and mouseup$ which handles the dragging functionality of the button.
   */
  private registerMove() {
    this.unregisterMove();
    this.elementMoveSubscription = new Subscription();

    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
      tap((event) => {
        event.preventDefault();
      }),
      map((event) => parseMouseEvent(event))
    );
    this.elementMoveSubscription.add(
      merge(mousemove$).subscribe((windowPoint) => {
        this.dragMove(windowPoint);
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
   * Unsubscribes from the mousemove$ observable if elementMoveSubscription is true.
   */
  private unregisterMove() {
    if (this.elementMoveSubscription) {
      this.elementMoveSubscription.unsubscribe();
      this.elementMoveSubscription = undefined;
    }
  }

  /*
   * Handles the drag start point for the min button.
   */
  private dragStart(windowPoint: Point) {
    this.windowStart = windowPoint;
    this.registerMove();
  }

  /*
   * Enables the max button to be dragged whenever the mousedown event is called.
   */

  private dragMove(windowPoint: Point) {
    const angle = this.calcMaxButtonAngle(windowPoint);
    this.layerLatestDelta = this.calcMaxButtonPosition(angle);

    this.setTransform(this.layerLatestDelta);
    this.ngZone.run(() => {
      this.angle = Math.round(angle);
    });
  }

  /*
   * Calculates angle
   */
  private calcMaxButtonAngle(windowPoint: Point) {
    let angle = 0;
    if (this.diameter) {
      const offset = this.circleRadius - this.maxButtonDiameter / 2;
      const mousePos: Point = {
        x: windowPoint.x - offset - 1170 + this.maxButtonDiameter,
        y: windowPoint.y - offset - 360 + this.maxButtonDiameter,
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
   * Calculates the min buttons position relative to the radius of the circle via x and y coordinates
   */
  private calcMaxButtonPosition(angle: number): Point {
    const newX = this.circleRadius * Math.sin((angle * Math.PI) / 180);
    const newY = this.circleRadius * -Math.cos((angle * Math.PI) / 180);

    return {
      x: newX,
      y: newY,
    };
  }

  /*
   * Stops the min button when the users is no longer pressing on the button
   */

  private dragStop() {
    this.unregisterMove();
    if (!this.layerLatestDelta) {
      return;
    }

    this.ngZone.run(() => {
      this.layerLatestDelta = undefined;
    });
  }

  private setTransform(point: Point) {
    this.element.style.transform = `translate(${point.x}px, ${point.y}px)`;
  }
}

/*
 *  Enables the mapping of the latest x and y coordinates for mouse events.
 */
function parseMouseEvent(event: MouseEvent): Point {
  return {
    x: event.pageX,
    y: event.pageY,
  };
}
