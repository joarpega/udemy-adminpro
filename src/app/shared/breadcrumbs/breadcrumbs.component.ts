import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor( private router: Router,
               private title: Title, // Permite cambiar el titulo de la pagina de manera dinamica permitiendo que se vea mas personalizada
               private meta: Meta // Permite agregar meta-tags a la pagina.
               ) {
    // Router - contiene algo llamado eventos
    this.getDataRoute()
    .subscribe( data => {
      console.log(data);
      this.titulo = data.titulo;
      this.title.setTitle( this.titulo );

      const metaTag: MetaDefinition = {
        name: 'Description',
        content: this.titulo
      };

      this.meta.updateTag( metaTag );

    });
  }

  ngOnInit() {
  }

  getDataRoute() {
    // Router - contiene algo llamado eventos
    return this.router.events.pipe(

      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento: ActivationEnd) => evento.snapshot.data )

    );
  }

}
