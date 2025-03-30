import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { AddAssociateComponent } from '../add-associate/add-associate.component';
import { Associate } from '../../store/model/Associate.model';
import { getAssociatesList } from '../../store/associate/associate.selectors';
import {
  deleteAssociate,
  getAssociate,
  loadAssociates,
  openDialog,
} from '../../store/associate/associate.actions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-associate-list',
  standalone: false,
  templateUrl: './associate-list.component.html',
  styleUrl: './associate-list.component.scss',
})
export class AssociateListComponent implements OnInit {
  associatesList!: Associate[];
  tableDataSource: any;
  tableDisplayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'address',
    'type',
    'associateGroup',
    'status',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadAssociates());
    this.store.select(getAssociatesList).subscribe((associatesList) => {
      this.associatesList = associatesList;
      this.tableDataSource = new MatTableDataSource(this.associatesList);
      this.tableDataSource.paginator = this.paginator;
      this.tableDataSource.sort = this.sort;
    });
  }

  addAssociate() {
    this.openDialog(0, 'Add Associate');
  }

  editAssociate(id: number) {
    this.openDialog(id, 'Edit Associate');
    this.store.dispatch(getAssociate({ id: id }));
  }

  deleteAssociate(id: number) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(deleteAssociate({ id: id }));
    }
  }

  openDialog(code: number, title: string) {
    this.store.dispatch(openDialog());
    this.dialog.open(AddAssociateComponent, {
      width: '50%',
      enterAnimationDuration: '50ms',
      exitAnimationDuration: '50ms',
      data: {
        code: code,
        title: title,
      },
    });
  }
}
