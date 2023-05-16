import { EstudanteService } from './../estudante.service';
import { Estudante } from './../estudante';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-estudante',
  templateUrl: './estudante.component.html',
  styleUrls: ['./estudante.component.css']
})
export class EstudanteComponent {
  estudante: Estudante[] = [];
  isEditing: boolean = false;
  formGroupEstudante: FormGroup;

  constructor(
    private estudanteService: EstudanteService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupEstudante = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      phoneNumber: [''],
      address: [''],
      course: [''],
    });
  }

  ngOnInit(): void {
    this.loadEstudantes();
  }
  loadEstudantes(){
    this.estudanteService.getEstudantes().subscribe({
      next: (data) => (this.estudante = data),
    });
  }

  save() {
    if (this.isEditing) {
      this.estudanteService.update(this.formGroupEstudante.value).subscribe({
        next: () => {
          this.loadEstudantes();
          this.formGroupEstudante.reset();
          this.isEditing = false;
        }
      });
    }
    else {
      this.estudanteService.save(this.formGroupEstudante.value).subscribe({
        next: data => {
          this.estudante.push(data)
          this.formGroupEstudante.reset();
        }
      });
    }
  }

  clean(){
    this.formGroupEstudante.reset();
    this.isEditing = false;
  }

  edit(estudante: Estudante) {
    this.formGroupEstudante.setValue(estudante);
    this.isEditing = true;
  }

  remove(estudante: Estudante) {
    this.estudanteService.delete(estudante).subscribe({
      next: () => this.loadEstudantes(),
    });
  }
}
