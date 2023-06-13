import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-form-details',
  templateUrl: './customer-form-details.component.html',
})
export class CustomerFormDetailsComponent implements OnInit {
  id!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
  }
}
