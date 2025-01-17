import { IonHeader, IonAvatar, IonIcon } from '@ionic/react';
import {notificationsOutline, pieChartOutline} from 'ionicons/icons';
import './header.css';

const Header: React.FC = () => {
    const storageItem = localStorage.getItem('user');
    const user = JSON.parse(storageItem);

    return (
        <IonHeader>
            <div className={"loggedInUserHead"}>
                <IonAvatar>
                    <img src={`../resources/media/${user.character}.png`} alt={user.character} className={"iconTeam"} />
                </IonAvatar>
                <p>{user.name}</p>
            </div>
            <a href={"/survey"}>
                <IonIcon aria-hidden="true" icon={pieChartOutline}/>
            </a>

        </IonHeader>
    );
};

export default Header;