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
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import { AvatarGroupComponent } from './specialcomponents/avatargroup/avatar-group.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { DashboardComponent } from './specialcomponents/dashboard/dashboard.component';
import { CrudbuttonComponent } from './buttons/crudbutton/crudbutton.component';
import { ContactusComponent } from './components/contactus/contactus.component';

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
    NzToolTipModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
