import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IUsuarios } from '../../interfaces/iusuarios';
@Component({
  selector: 'app-newuser',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewuserComponent {
  userForm: FormGroup ;
  tipo: string = "Añadir";

  activatedRoute = inject(ActivatedRoute);
  userService = inject(UsersService);
  router = inject(Router);

  constructor(){
    this.userForm = new FormGroup({
      firstname : new FormControl('',[Validators.required]),  
      lastname : new FormControl('',[Validators.required]),  
      username : new FormControl('',[Validators.required]),  
      email : new FormControl('',[Validators.required]),  
      image : new FormControl('',[Validators.required]),  
      password : new FormControl('',[Validators.required]),  
        }, []);
  }

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async (params: any) =>{
      if(params.iduser){
        this.tipo = "Actualizar";
        const response = await this.userService.getById(params.idserie);

        this.userForm = new FormGroup({
          _id: new FormControl(response._id, []),
          firstname: new FormControl(response.first_name, [Validators.required]),
          lastname: new FormControl(response.last_name, [Validators.required]),
          username: new FormControl(response.username, [Validators.required]),
          email: new FormControl(response.email, [Validators.required]),
          image: new FormControl(response.image, [Validators.required]),
          password: new FormControl(response.password,[Validators.required])
        }, []);
      }
    });
  }

  async getDataForm() {
    
    let user: IUsuarios = this.userForm.value;

    if(user.first_name != ''){
          
      if(user._id){
       
        const response = await this.userService.update(user);

        if (response.id) {
          alert(`El usuario ${response.first_name} se ha actualizado correctamente`);
        this.router.navigate(['/home']);
        } else {
          alert(`Ha ocurrido un problema en la actualizacion`);
        }
      }
      else{
        
        const response = await this.userService.insert(user);
        if(response.id){
          alert(`El usuario ${response.first_name} se ha añadido correctamente`);
          this.router.navigate(['/home']);
        }
        else {
          alert(`Ha ocurrido un problema en la insercion`);
        }
      }
    }else{
      alert(`Debe de rellenar todos los campos`);
    }
  }

}
