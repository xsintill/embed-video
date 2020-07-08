import './app.scss';

import { module, element, bootstrap } from 'angular';
import '@uirouter/angularjs';
import 'angular-sanitize';

// app.ts
import { AppComponent } from '../app/app.component';
import { HomeComponent } from '../app/home/home.component';
import { UserComponent } from '../app/user/user.component';
import { VideoEmbedContainer } from '../app/video-embed/video-embed.container';
import { UserService } from '../app/services/user.services';
import { VideoEmbedUi } from './video-embed/video-embed.ui';

export let app = module('app', [
    'ui.router',
    'ngSanitize'
])
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
        $stateProvider.state({
            name: 'app',
            url: '/app',
            component: AppComponent.NAME
        }).state(
            {
                name: 'app.video-embed',
                url: '/video-embed',
                component: VideoEmbedContainer.componentName,
            });

        $urlRouterProvider.otherwise('/app/video-embed');
    }])
    .component(AppComponent.NAME, new AppComponent())
    .component(HomeComponent.NAME, new HomeComponent())
    .component(UserComponent.NAME, new UserComponent())
    .component(VideoEmbedContainer.componentName, {
        controller: VideoEmbedContainer,
        templateUrl: require('./video-embed/video-embed.container.html')
    })
    .component(VideoEmbedUi.componentName, {
        controller: VideoEmbedUi,
        templateUrl: require('./video-embed/video-embed.ui.html')
    })
    .service(UserService.NAME, UserService);
element(document).ready( () => {
    bootstrap(document, ['app']);
});
