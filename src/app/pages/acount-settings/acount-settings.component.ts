import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-acount-settings',
  templateUrl: './acount-settings.component.html',
  styles: []
})
export class AcountSettingsComponent implements OnInit {
  constructor( public _ajustes: SettingsService) {}

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: ElementRef) {
    // console.log(link);
    this.aplicarCheck(link);
    this._ajustes.aplicarTema(tema);
  }

  aplicarCheck(link: any) {
    const SELECTORES: any = document.getElementsByClassName('selector');

    // console.log(SELECTORES);

    for (const ref of SELECTORES) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    const SELECTORES: any = document.getElementsByClassName('selector');

    let tema = this._ajustes.ajustes.tema;

    for (const ref of SELECTORES) {
      if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
      }
    }

  }
}
