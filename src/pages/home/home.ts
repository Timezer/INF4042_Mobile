import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { Observable } from 'rxjs/Observable';
import { Item } from '../../models/item/item.model';
import { ToastService } from '../../services/toast/toast.service';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    shoppingList$: Observable<Item[]>;

    constructor(public navCtrl: NavController, private shopping: ShoppingListService, private toast: ToastService) {
        this.shoppingList$ = this.shopping
            .getShoppingList() //DB LIST
            .snapshotChanges() //Key and Value
            .map(
            changes => {
                return changes.map(c => ({
                    key: c.payload.key,
                    ...c.payload.val()
                }));
            }
            );
    }

    showHelp() {
        this.toast.show(`Veuillez vous connectez à internet pour récupérer les données de la base de données!`);
    }
}