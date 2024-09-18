import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Firestore} from "@angular/fire/firestore";
import {Auth} from "@angular/fire/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private defaultPreferences: string[] = ['General', 'Health', 'Science', 'Business', 'Technology', 'Sports', 'Entertainment'];
  private preferencesSubject = new BehaviorSubject<string[]>(this.defaultPreferences);
  preferences$ = this.preferencesSubject.asObservable();

  constructor(private auth: Auth, private firestore: Firestore) {
    this.loadPreferences();
  }

  async loadPreferences() {
    // Verificamos el estado de autenticación antes de decidir desde dónde cargar las preferencias
    const user = this.auth.currentUser;

    if (user) {
      try {
        // Si el usuario está logueado, cargamos desde Firestore
        await this.loadPreferencesFromFirebase(user.uid);
      } catch (error) {
        console.error('Error cargando las preferencias desde Firebase:', error);
      }
    } else {
      // Si no hay usuario logueado, cargamos desde localStorage
      if (typeof localStorage !== 'undefined') {
        const storedPreferences = localStorage.getItem('preferences');
        if (storedPreferences) {
          this.preferencesSubject.next(JSON.parse(storedPreferences));  // Emitir las preferencias desde localStorage
        }
      }
    }
  }

  public async loadPreferencesFromFirebase(userId: string) {
    const docRef = doc(this.firestore, `users/${userId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userPreferences = docSnap.data()['preferences'] as string[];
      this.preferencesSubject.next(userPreferences);  // Emitir las preferencias cargadas desde Firebase
    }
  }



  togglePreference(preference: string) {
    const currentPreferences = this.preferencesSubject.value;
    let updatedPreferences: string[];

    if (currentPreferences.includes(preference)) {
      updatedPreferences = currentPreferences.filter(p => p !== preference);
    } else {
      updatedPreferences = [...currentPreferences, preference];
    }

    this.preferencesSubject.next(updatedPreferences);
    this.savePreferences();
  }

  async savePreferences() {
    const user = this.auth.currentUser;
    const preferences = this.preferencesSubject.value;
    if (user) {
      try {
        const docRef = doc(this.firestore, `users/${user.uid}`);
        await setDoc(docRef, { preferences }, { merge: true });

        await this.loadPreferencesFromFirebase(user.uid);
      } catch (error) {
        console.error('Error guardando las preferencias en Firebase:', error);
      }
    } else {
      localStorage.setItem('preferences', JSON.stringify(preferences));
    }
  }

  getPreferences() {
    return this.preferencesSubject.value;
  }

}
