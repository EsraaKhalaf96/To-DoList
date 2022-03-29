import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from "@angular/common";
import { Inject } from "@angular/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todoList';
  constructor(private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document
    ) {}
    changeCssFile(lang: string) {
      let headTag = this.document.getElementsByTagName("head")[0] as HTMLHeadElement;
      let existingLink = this.document.getElementById("langCss") as HTMLLinkElement;
      let bundleName = lang === "ar" ?"arabicStyle.css":"englishStyle.css";
      if (existingLink) {
         existingLink.href = bundleName;
      } else {
         let newLink = this.document.createElement("link");
         newLink.rel = "stylesheet";
         newLink.type = "text/css";
         newLink.id = "langCss";
         newLink.href = bundleName;
         console.log(newLink.href);
         headTag.appendChild(newLink);
      }
      }
  changeLangage(lang: string) {
    let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    // this.changeCssFile(lang);
}

}
