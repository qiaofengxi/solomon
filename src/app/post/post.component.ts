import {animate, Component, HostListener, Inject, OnInit, state, style, transition, trigger} from "@angular/core"
import {ActivatedRoute} from "@angular/router"
import {DomSanitizer, SafeHtml, Title} from "@angular/platform-browser"
import {Post} from "../share/classes/Post"
import {Comment} from "../share/classes/Comment"
import {Location} from "@angular/common"
import {PostService} from "../share/service/post"
import {ThemeService} from "../share/service/theme"
import {GitHubService} from "../share/service/github"
import {SolomonConfig} from "../share/interface/solomon-config"
import {CONFIG_TOKEN} from "../config"


@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [
    trigger('toTopState', [
      state('true', style({transform: 'translateY(0)'})),
      state('false', style({transform: 'translateY(200%)'})),
      transition('1 => 0', animate(200)),
      transition('0 => 1', animate(200))
    ]),
    trigger('backState', [
      state('true', style({transform: 'translateY(0)'})),
      state('false', style({transform: 'translateY(-200%)'})),
      transition('1 => 0', animate(200)),
      transition('0 => 1', animate(200))
    ])
  ]
})

export class PostComponent implements OnInit {
  private GITHUB_USERNAME: string
  private GITHUB_POST_REPO: string
  toTopVisibility: boolean = false
  backVisibility: boolean = false
  isDark: boolean
  safeHtml: SafeHtml
  post: Post
  comments: Comment[]

  constructor(@Inject(CONFIG_TOKEN) config: SolomonConfig,
              private postService: PostService,
              private location: Location,
              private titleService: Title,
              private sanitizer: DomSanitizer,
              private themeService: ThemeService,
              private githubService: GitHubService,
              private router: ActivatedRoute) {
    this.GITHUB_USERNAME = config.GITHUB_USERNAME
    this.GITHUB_POST_REPO = config.GITHUB_POST_REPO
  }

  toggleTheme(): void {
    this.isDark = !this.isDark
    this.themeService.toggleTheme()
  }

  backClicked(): void {
    this.location.back()
  }

  toTopClicked(): void {
    window.scrollTo(0, 0)
  }

  jumpTo(id: string): void {
    window.location.hash = id
  }

  viewSourceClicked(): void {
    window.open(`https://github.com/${this.GITHUB_USERNAME}/${this.GITHUB_POST_REPO}/blob/master/${this.post.intro.slug}.md`)
  }

  @HostListener('window:scroll', ['$event'])
  changeVisibility() {
    this.toTopVisibility = document.body.scrollTop > 500
    this.backVisibility = document.body.scrollTop < 50
  }

  getPost(slug: string): void {
    this.postService
      .getPost(slug)
      .then(post => {
        this.post = post
        this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.post.html)
        this.titleService.setTitle(`${post.intro.title} - Solomon`)
        return post.intro.issue_number
      })
      .then(number => this.githubService.getIssueComments(number).then(comments => this.comments = comments))
  }

  ngOnInit(): void {
    this.router.params
      .subscribe(params => this.getPost(params['slug']))
    this.isDark = this.themeService.getTheme()
  }
}