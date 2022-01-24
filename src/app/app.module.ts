import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeaturespageComponent } from './staticcomponents/featurespage/featurespage.component';
import { GetstartedComponent } from './buttons/getstarted/getstarted.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import { AvatarGroupComponent } from './specialcomponents/avatargroup/avatar-group.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { DashboardComponent } from './specialcomponents/dashboard/dashboard.component';
import { HomepageComponent } from './staticcomponents/homepage/homepage.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { SignupforfreeComponent } from './buttons/signupforfree/signupforfree.component';
import { LoadinganimationComponent } from './specialcomponents/loadinganimation/loadinganimation.component';
import { UserdetailsComponent } from './reusablecomponent/userdetails/userdetails.component';
import { ChangepasswordComponent } from './reusablecomponent/changepassword/changepassword.component';
import { AcceptordeclinebtnComponent } from './buttons/acceptordeclinebtn/acceptordeclinebtn.component';
import { ClearallComponent } from './buttons/clearall/clearall.component';
import {MatCardModule} from "@angular/material/card";
import { FriendrequestComponent } from './cards/friendrequest/friendrequest.component';
import { FriendsheaderComponent } from './components/friendsheader/friendsheader.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { SendfriendrequestcardComponent } from './cards/sendfriendrequestcard/sendfriendrequestcard.component';
import { FriendspageComponent } from './components/friendspage/friendspage.component';
import { FriendcardComponent } from './cards/friendcard/friendcard.component';
import { CrudbuttonComponent } from './buttons/crudbutton/crudbutton.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { CentermodalComponent } from './modals/centermodal/centermodal.component';
import { WorkspacecardComponent } from './cards/workspacecard/workspacecard.component';
import { ProjectcardComponent } from './cards/projectcard/projectcard.component';
import { ProjectAddComponent } from './modals/projectadd/project-add.component';
import { CrudbuttonpinkComponent } from './buttons/crudbuttonpink/crudbuttonpink.component';
import { WorkspaceaddComponent } from './modals/workspaceadd/workspaceadd.component';
import { ProjecteditComponent } from './modals/projectedit/projectedit.component';
import { WorkspaceeditComponent } from './modals/workspaceedit/workspaceedit.component';
import {SearchComponent} from "./reusablecomponent/search/search.component";
import { HeaderComponent } from './navigation/header/header.component';
import {WorkspacepageComponent} from "./components/workspacepage/workspacepage.component";
import {MatPasswordStrengthModule} from "@angular-material-extensions/password-strength";
import {
PasswordStrengthBarComponent
} from './specialcomponents/password-strength-bar/password-strength-bar.component';
import {ErrormodalComponent} from "./modals/errormodal/errormodal.component";
import {DeletedmodalComponent} from "./modals/deletedmodal/deletedmodal.component";
import { ConfirmmodalComponent } from './modals/confirmmodal/confirmmodal.component';
import {SuccessmodalComponent} from "./modals/successmodal/successmodal.component";
import { PasswordconfrimmodalComponent } from './modals/passwordconfrimmodal/passwordconfrimmodal.component';
import { UserprofileimagemodalComponent } from './modals/userprofileimagemodal/userprofileimagemodal.component';
import {ImageCropperModule} from "ngx-image-cropper";

import { environment } from '../environments/environment';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import { ForgotpasswordComponent } from './reusablecomponent/forgotpassword/forgotpassword.component';
import {LoginComponent} from "./components/login/login.component";

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { GooglesignupComponent } from './buttons/googlesignup/googlesignup.component';
import { NotificationspageComponent } from './components/notificationspage/notificationspage.component';
import {InvitationscardComponent} from "./cards/invitationscard/invitationscard.component";
import {NotificationheaderComponent} from "./reusablecomponent/notificationheader/notificationheader.component";
import {ConfirmdeletemodalComponent} from "./modals/confirmdeletemodal/confirmdeletemodal.component";
import {LoginerrComponent} from "./modals/loginerr/loginerr.component";
import { ActivitypageComponent } from './components/activitypage/activitypage.component';
import {ProjectpageComponent} from "./components/projectpage/projectpage.component";
import {TaskcardComponent} from "./cards/taskcard/taskcard.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatExpansionModule} from "@angular/material/expansion";
import { TaskstructureComponent } from './draganddrop/taskstructure/taskstructure.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ActivitycardComponent } from './cards/activitycard/activitycard.component';
import {Confirmmodal2Component} from "./modals/confirmmodal2/confirmmodal2.component";
import {SignuppageComponent} from "./components/signuppage/signuppage.component";
import {
  SignupuserprofileimagemodalComponent
} from "./modals/signupuserprofileimagemodal/signupuserprofileimagemodal.component";
import {MulticonfirmmodalComponent} from "./modals/multiconfirmmodal/multiconfirmmodal.component";
import {Multiconfirmmodal2Component} from "./modals/multiconfirmmodal2/multiconfirmmodal2.component";
registerLocaleData(en);






@NgModule({
  declarations: [
    AppComponent,
    FeaturespageComponent,
    GetstartedComponent,
    SidebarComponent,
    AvatarGroupComponent,
    UserprofileComponent,
    DashboardComponent,
    CrudbuttonComponent,
    ContactusComponent,
    HomepageComponent,
    FooterComponent,
    SignupforfreeComponent,
    LoadinganimationComponent,
    UserdetailsComponent,
    ChangepasswordComponent,
    AcceptordeclinebtnComponent,
    ClearallComponent,
    FriendrequestComponent,
    FriendsheaderComponent,
    SendfriendrequestcardComponent,
    FriendspageComponent,
    FriendcardComponent,
    CentermodalComponent,
    WorkspacecardComponent,
    ProjectcardComponent,
    ProjectAddComponent,
    CrudbuttonpinkComponent,
    WorkspaceaddComponent,
    ProjecteditComponent,
    WorkspaceeditComponent,
    SearchComponent,
    HeaderComponent,
    WorkspacepageComponent,
    PasswordStrengthBarComponent,
    PasswordStrengthBarComponent,
    ErrormodalComponent,
    DeletedmodalComponent,
    ConfirmmodalComponent,
    SuccessmodalComponent,
    PasswordconfrimmodalComponent,
    UserprofileimagemodalComponent,
    ForgotpasswordComponent,
    LoginComponent,
    GooglesignupComponent,
    NotificationspageComponent,
    InvitationscardComponent,
    NotificationheaderComponent,
    ConfirmdeletemodalComponent,
    LoginerrComponent,
    ActivitypageComponent,
    ProjectpageComponent,
    TaskcardComponent,
    TaskstructureComponent,
    ActivitycardComponent,
    WorkspaceeditComponent,
    Confirmmodal2Component,
    SignuppageComponent,
    SignupuserprofileimagemodalComponent,
    MulticonfirmmodalComponent,
    Multiconfirmmodal2Component,



  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgbModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        FormsModule,
        HttpClientModule,
        NzAvatarModule,
        NzDividerModule,
        NzToolTipModule,
        MatCardModule,
        MatToolbarModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatPasswordStrengthModule,
        ImageCropperModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        SocialLoginModule,
        MatProgressBarModule,
        MatExpansionModule,
        DragDropModule


    ],
  providers: [{ provide: NZ_I18N, useValue: en_US },  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '288132798361-sea33rgpr7oj5juj0q603k5sapuhhjus.apps.googleusercontent.com'
          )
        }
      ]
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
