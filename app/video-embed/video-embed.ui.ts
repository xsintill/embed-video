import './video-embed.ui.scss';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VideoEmbedPresenter } from './video-embed.presenter';
import { IPresentableVideoEmbed } from './video-embed.type';
import { extractChangeValue } from '../utils/on-change-object-helper';

/**
 *  View component llq-video-embed-ui
 */
export class VideoEmbedUi {
    /**
     * Presentable for VideoEmbedUi
     */
    public presentable: IPresentableVideoEmbed;

    private presenter: VideoEmbedPresenter;
    private readonly unsubscribe = new Subject();

    /**
     *  Field with value used for registering the component llq-video-embed-ui
     */
    public static componentName = 'llqVideoEmbedUi';

    /**
     *  Dependency injection annotations
     */
    public static $inject = [
        '$sce'
    ];

    constructor(
        private readonly $sce: ng.ISCEService
    ) {
        this.presenter = new VideoEmbedPresenter(this.$sce);
        this.presenter.presentable$.pipe(
            takeUntil(this.unsubscribe)
        ).subscribe((presentable: IPresentableVideoEmbed) => {
            this.presentable = presentable;
        });
    }

    public pasteBrightcove(): void {
        this.presenter.createPresentable(this.presentable, `<iframe src="//players.brightcove.net/1160438696001/B1xrOuQICW_default/index.html?videoId=5476480570001" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>`);
    }

    public pasteFrameio(): void {
        this.presenter.createPresentable(this.presentable, `<iframe allowtransparency="true" title="Wistia video player" allowFullscreen frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" src="https://fast.wistia.net/embed/iframe/vkmxppkwsr" width="400" height="225"></iframe>`);
    }

    public pasteVimeoUnresponsive(): void {
        this.presenter.createPresentable(this.presentable, `<iframe src="https://player.vimeo.com/video/103732188" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
        <p><a href="https://vimeo.com/103732188">Aphex Twin - Windowlicker Tribute</a> from <a href="https://vimeo.com/user17486045">Daniel Hennies</a> on <a href="https://vimeo.com">Vimeo</a>.</p>`);
    }
    public pasteVimeoResponsive(): void {
        this.presenter.createPresentable(this.presentable, `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/41860263" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
        <p><a href="https://vimeo.com/41860263">The Very Good Dinosaur by Mick Inkpen</a> from <a href="https://vimeo.com/browse">neal</a> on <a href="https://vimeo.com">Vimeo</a>.</p>`);
    }

    public pasteYoutube(): void {
        this.presenter.createPresentable(this.presentable, `<iframe width="560" height="315" src="https://www.youtube.com/embed/Urv82SGIu_0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
    }

    /**
     * Lifecycle hook which is called by angular when the component is destroyed
     * @returns: does not return anything
     */
    public $onDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    /**
     * Life-cycle hook which is called by angular when a change occurs for any bindings assigned to the component
     * @returns: does not return anything
     */
    public $onChanges(onChangesObj: ng.IOnChangesObject): void {
        const videoEmbed: string = extractChangeValue<string>(onChangesObj.videoEmbed);

        this.presenter.createPresentable(this.presentable, videoEmbed);
    }
}
