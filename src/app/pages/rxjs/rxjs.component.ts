import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    /*
    // Clase 76
    this.regresaObservable()
    // .pipe todos los observables tienen esta funcion la cual permite definir una serie de operadores.
    .pipe(
      retry(2)  // retry() se debe importar de la libreria rxjs: import { retry } from 'rxjs/operators';
    )
    .subscribe(
      numero => console.log('Subs ', numero),
      error => console.error('Auxilio!'),
      () => console.log('Observable termino !')
      );
    */

    // Clase 77 ... sin retry
    this.subscription = this.regresaObservable().subscribe(
      numero => console.log('Subs ', numero),
      error => console.error('Auxilio!'),
      () => console.log('Observable termino !')
    );
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /** @Resume Ejemplo de una funcion que regresa un observable
   * se puede especificar el tipo de valor que puede retornar
   * @ej regresaObservable(): Observable<number>
   */
  regresaObservable(): Observable<any> {
    // Clase 77 ...

    return new Observable((observer: Subscriber<any>) => {
      let contador: number = 0;

      let intervalo = setInterval(() => {

        const salida = {
          valor: contador
        };

        observer.next(salida);

        // para la clase 80 se debe comentar esto para que la peticion (subscribe) se vuelva infinita
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        contador += 1;
      }, 1000);
    })
    .pipe(
      /** para saber mas de los operadores visitar http://reactivex.io/documentation/operators.html */
      map( resp => resp.valor), // map() se debe importar de la libreria rxjs: import { map } from 'rxjs/operators';
      filter( (valor, index) => { // filter() se debe importar de la libreria rxjs: import { filter } from 'rxjs/operators';
        // console.log(`Valor ${valor} - index ${index}`);
        if ( (valor % 2)  === 1 ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
        // filter() forzosamente debe regresar un true o false.
      })
    );
  }

  regresaObservable_1(): Observable<any> {
    // Clase 76 ...

    return new Observable((observer: Subscriber<any>) => {
      let contador: number = 0;

      let intervalo = setInterval(() => {
        observer.next(contador);

        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        // Manejo de error
        if (contador === 2) {
          /** Si esta linea esta comentada nunca se reinicia el intervalo por lo que el contador sigue incrementandose
           * y se asume que en el siguiente intento todo salio bien.
           *
           *
           */
          // clearInterval( intervalo );
          observer.error();
        }

        contador += 1;
      }, 1000);
    });
  }
}
