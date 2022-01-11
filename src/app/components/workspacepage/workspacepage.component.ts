import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {WorkspaceService} from "../../services/workspacepage.service";

@Component({
  selector: 'app-workspacepage',
  templateUrl: './workspacepage.component.html',
  styleUrls: ['./workspacepage.component.css']
})
export class WorkspacepageComponent implements OnInit {


  @Output() setProjects = new EventEmitter();



  projects: Object[] = [{}];
  projectObject: any = {};
  numbers:  any[] = ["2","3","4","5","6","7","8","9","10"];
  workspaceID = "61d448976fc2f6cc55b25ca5";

  workspaceService : WorkspaceService;
  constructor(workspaceService : WorkspaceService) {
    this.workspaceService = workspaceService;
  }

  async ngOnInit(): Promise<void> {
    await this.getProjectDetails();
  }

  getProjectDetails(){
    this.workspaceService.getAllProjects(this.workspaceID).subscribe((post: any)=> {
      this.projectObject = post;
      this.projects = this.projectObject[0].Projects;
      console.log("Project Details")
      console.log(this.projectObject[0].Projects);

    });

  }

}
