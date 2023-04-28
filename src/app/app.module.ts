import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TrendingSubjectsComponent } from './components/trending-subjects/trending-subjects.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FormsModule } from '@angular/forms';
import { BookService } from './core/services/book.service';

@NgModule({
  declarations: [
    AppComponent,
    TrendingSubjectsComponent,
    HomeComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
