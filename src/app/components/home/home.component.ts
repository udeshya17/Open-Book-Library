import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { Router } from '@angular/router';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  isLoading: boolean = false;
  searchQuery: string = '';
  searchType: string = 'title';
  booksList: Array<any> = [];

  constructor(private router: Router, private bookService: BookService) {
    this.bookSearch = new FormControl('');
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
        filter((value) => value.length > 2)
      )
      .subscribe((value: string) => {
        this.searchQuery = value;
        this.isLoading = true;
        this.bookService
          .searchBooks(this.searchQuery, this.searchType)
          .subscribe(
            (response: any) => {
              this.booksList = response.books;
              this.isLoading = false;
            },
            (error) => {
              console.log(error);
              this.isLoading = false;
            }
          );
      });
  }

  search() {
    this.isLoading = true;
    this.bookService
      .searchBooks(this.searchQuery, this.searchType)
      .subscribe((books) => {
        this.booksList = books;
        this.isLoading = false;
      });
  }

  searchBooks() {
    this.isLoading = true;
    this.bookService.searchBooks(this.searchQuery, this.searchType).subscribe(
      (response: any) => {
        this.booksList = response.books;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }
}
