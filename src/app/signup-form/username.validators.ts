import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UsernameValidators {
    static cannotContainSpace(control: AbstractControl) : any | null {
        if((control.value as string).indexOf(' ') >=0)
            return { cannotContainSpace: true };

        return null;
    }
}