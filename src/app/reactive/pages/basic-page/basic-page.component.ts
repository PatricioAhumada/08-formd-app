import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit{

  //forma 1 : debe importar el ReactiveFormsModule en reactive.module.ts
  // public myForm : FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   storage: new FormControl(0)
  // })

  //forma 2 inyectar un servicio
  public myForm : FormGroup = this.fb.group({
    name    :   [ '', [ Validators.required , Validators.minLength(3) ] ] ,
    price   :   [ 0 , [ Validators.required , Validators.min(0)] ] ,
    inStorage : [ 0 , [ Validators.required , Validators.min(0)] ]
  });

  constructor( private fb:FormBuilder){}

  ngOnInit(): void {

  }

  isValidField(field:string):boolean | null{
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }

  getFieldError(field:string):string | null {
    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)){
      switch ( key ){
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Se requieren como mínimo ${ errors['minlength'].requiredLength} caracteres.`;
      }
    }
     return null
  }

  onSave():void{
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched;
      return;
    }
    console.log(this.myForm.value);

    this.myForm.reset({price: 0 ,inStorage:0}); //  no se requiere poner los string pq los hace por default

  }

}
