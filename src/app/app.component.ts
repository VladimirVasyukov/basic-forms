import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { TuiValidationError } from '@taiga-ui/cdk';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Заполните поле`,
      },
    },
  ],
})
export class AppComponent {
  readonly languages = [`Русский`, `English`, `Deutsch`, `Español`, `中國人`];

  readonly form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    skills: new FormArray([], this.getSkillsArrayValidator()),
  });

  addSkill(): void {
    (<any>this.form.controls['skills']).push(
      new FormControl('', Validators.required)
    );
  }

  deleteSkill(skill: number) {
    this.form.controls['skills'].removeAt(skill);
  }

  submit(): void {
    console.log({
      name: this.form.controls.firstName.value,
      surname: this.form.controls.lastName.value,
      lang: this.form.controls.language.value,
      role: this.form.controls.role.value,
      skills: this.form.controls.skills.value,
    });
    this.form.reset();
  }

  getSkillsArrayValidator(): ValidatorFn {
    return ((array: FormArray): ValidationErrors | null =>
      array.controls.length > 3
        ? {
            length: new TuiValidationError(`Желательно не больше 3х умений`),
          }
        : null) as ValidatorFn;
  }
}
