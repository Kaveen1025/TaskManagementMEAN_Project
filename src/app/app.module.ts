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
    MatInputModule

  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
