import {Component, Inject, Input} from "@angular/core"
import {SearchResult} from "../../../../../share/classes/SearchResult"
import {Intro} from "../../../../../share/classes/Post"
import {CONFIG_TOKEN} from "../../../../../config"
import {SolomonConfig} from "../../../../../share/interface/solomon-config"


@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  private _result: SearchResult
  @Input() intros: Intro[]
  GITHUB_USERNAME: string
  GITHUB_POST_REPO: string

  constructor(@Inject(CONFIG_TOKEN) config: SolomonConfig) {
    this.GITHUB_USERNAME= config.GITHUB_USERNAME
    this.GITHUB_POST_REPO = config.GITHUB_POST_REPO
  }

  @Input()
  set result(result: SearchResult) {
    this._result = result
    this._result.items.forEach(item => {
      item.intro = this.intros.find(intro => intro.slug === item.name.substring(0, item.name.length - 3))
    })
  }

  get result(): SearchResult {
    return this._result
  }
}