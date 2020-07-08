import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';

import { IPresentableVideoEmbed } from './video-embed.type';

/**
 *  Presenter for VideoEmbed
 */
export class VideoEmbedPresenter {

    private readonly presentable: Subject<IPresentableVideoEmbed> = new Subject();
    /**
     * Observable for IPresentableVideoEmbed
     */
    public presentable$: Observable<IPresentableVideoEmbed> = this.presentable.asObservable();

    constructor(private readonly $sce: ng.ISCEService) {
    }

    /**
     * This method is mainly here as an example
     */
    public createPresentable(presentableState: IPresentableVideoEmbed, embedCode: string): void {
        const presentable = this.determineDefaultOrPreviousState(presentableState);
        // Transform the videoEmbed to make it become presentable
        this.handleVideoEmbedChange(presentable, embedCode);
        this.presentable.next(presentable);
    }

    private handleVideoEmbedChange(presentable: IPresentableVideoEmbed, embedCode: string): void {
        if (embedCode) {
            presentable.embedCode = embedCode;
            presentable.trusted = this.$sce.trustAsHtml(embedCode) as string;
            console.log('this.$sce.trustAsHtml(embedCode) as string;', this.$sce.trustAsHtml(embedCode) as string);
        }
    }

    private determineDefaultOrPreviousState(previousState: IPresentableVideoEmbed): IPresentableVideoEmbed {
        return (previousState === undefined) ?
            { ...this.getDefaultPresentableValues() } :
            { ...previousState };
    }

    private getDefaultPresentableValues(): IPresentableVideoEmbed {
        const presentableState: Partial<IPresentableVideoEmbed> = {
            // Put the IPresentableVideoEmbed properties here you need defaults for
           embedCode: '',
           placeHolder: 'Your embed code here',
           trusted: ''

        };
        return presentableState as Required<IPresentableVideoEmbed>;
    }
}
