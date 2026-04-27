import { BehaviorSubject } from 'rxjs';
import { STORE_KEY } from '../constants/storeService.constant';
import { Singleton } from '../decorators/Singleton.decorator';
import { StoreService } from '../services/Store.service';

@Singleton
class Store extends StoreService {
  @StoreService.Inject(STORE_KEY.auth, false)
  private readonly isAuthenticated$ = new BehaviorSubject(false);
}

const store = new Store();

export { store };
