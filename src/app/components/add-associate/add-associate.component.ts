import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  addAssociate,
  updateAssociate,
} from '../../store/associate/associate.actions';
import { Associate } from '../../store/model/Associate.model';
import { getAssociate } from '../../store/associate/associate.selectors';

@Component({
  selector: 'app-add-associate',
  standalone: false,
  templateUrl: './add-associate.component.html',
  styleUrl: './add-associate.component.scss',
})
export class AddAssociateComponent implements OnInit {
  title: string = 'Add Associate';
  isEdit: boolean = false;
  dialogData: any;
  associateForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddAssociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {
    this.associateForm = formBuilder.group({
      id: this.formBuilder.control(0),
      name: this.formBuilder.control('', Validators.required),
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      phone: this.formBuilder.control('', [Validators.required]),
      type: this.formBuilder.control('CUSTOMER'),
      address: this.formBuilder.control('', Validators.required),
      associateGroup: this.formBuilder.control('Level-1'),
      status: this.formBuilder.control(true),
    });
  }

  ngOnInit(): void {
    this.dialogData = this.data;
    this.title = this.dialogData.title;
    this.store.select(getAssociate).subscribe((associate) => {
      this.associateForm.setValue({
        id: associate.id,
        name: associate.name,
        email: associate.email,
        phone: associate.phone,
        type: associate.type,
        address: associate.address,
        associateGroup: associate.associateGroup,
        status: associate.status,
      });
    });
  }

  saveAssociate() {
    if (this.associateForm.valid) {
      const associate: Associate = {
        id: this.associateForm.value.id as number,
        name: this.associateForm.value.name as string,
        email: this.associateForm.value.email as string,
        phone: this.associateForm.value.phone as string,
        type: this.associateForm.value.type as string,
        address: this.associateForm.value.address as string,
        associateGroup: this.associateForm.value.associateGroup as string,
        status: this.associateForm.value.status as boolean,
      };

      if (associate.id === 0) {
        this.store.dispatch(addAssociate({ associate: associate }));
      } else {
        this.store.dispatch(updateAssociate({ associate: associate }));
      }

      this.closeDialog();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
