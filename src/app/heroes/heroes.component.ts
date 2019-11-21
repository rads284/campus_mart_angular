import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Course[];
  documents: any;
  prev_len: any;
  loading: boolean;
  offset: number;
  constructor(private route: ActivatedRoute,private heroService: HeroService, private router:Router) { }

  ngOnInit() {
    this.getHeroes();
    this.loading = false;
    this.offset = 7;
    this.documents = this.heroService.searchDoc("",0,7).subscribe(data=>{
    this.documents = data;
    })
  }

  fileUpload(fileInput: any): void{
    const id = +this.route.snapshot.paramMap.get('id');
    if (fileInput.target.files && fileInput.target.files[0]){
      this.loading = true;
      this.heroService.categoriseDoc(fileInput.target.files[0]).subscribe(data=>{
        this.router.navigate(['/detail/'+data]);
        this.loading =  false;
      });
    }
  }
  loadData(){
    // console.log("Loading");
    // let new_len = Array.of(this.documents).length + 5;
    // console.log(new_len);
    this.heroService.searchDoc("",this.offset,this.offset+5).subscribe(data=>{
      // this.documents = data.slice(1,new_len);
      this.offset+=5;

      // console.log(data[0]);
      // let x = Array(data)[0];
      // console.log(Array(x));
      for(let i=0;i<5;++i)
      {
      //   console.log(typeof(e));
      //   // this.documents.push(e[0]);
      //   if(e){
      //   for(var i=0;i < (e.length);i++)
      //   {
      //   //   console.log(i);
      if(data[i]){
          this.documents.push(data[i]);
        }
        }
      // }
        // // for(let a of e){
          // console.log(a);
          // this.documents.push(a);
        // }
      // }
    })
  }
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  search(name: String){
    name = name.trim();
    this.documents = [];
    this.heroService.searchDoc(name,0,5).subscribe(
    data=>{
      this.documents = data;
      console.log(data);
    }
  );
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Course)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Course): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
