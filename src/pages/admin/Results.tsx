import '../../interface/interfaces'
import '../RegisterTeam.css'
import {LinearGradient} from "react-text-gradients";
import {
    IonButton,
    IonContent,
    IonPage,
    IonIcon,
    IonCheckbox, IonAccordion,
    IonAccordionGroup,
    IonItem, IonLabel, IonToast
} from "@ionic/react";
import {arrowBackOutline, arrowForwardOutline} from 'ionicons/icons';
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import "./Points.css"
import {TeamReturnDTO} from "../../util/api/config/dto";
import {getTeamFinalRanked} from "../../util/service/adminService";
import {useHistory} from "react-router";
import {checkToken, getUser} from "../../util/service/loginService";

const Results: React.FC<LoginProps> = (props: LoginProps) => {
    const [teams, setTeams] = useState<TeamReturnDTO[]>([]);
    const [userCharacter, setUserCharacter] = useState<string | null>(null);
    const [error, setError] = useState<string>('Error');
    const [toastColor, setToastColor] = useState<string>('#CD7070');
    const [showToast, setShowToast] = useState(false);

    const user = getUser();
    const history = useHistory();

    useEffect(() => {
        if (!checkToken()) {
            window.location.assign('/admin/login');
        }

        const teamNames = getTeamFinalRanked();
        teamNames.then((response) => {
            console.log(response);
            setTeams(response);
        }).catch((error) => {
            console.error(error);
            setError(error.response.data.message);
            setToastColor('#CD7070');
            setShowToast(true);
        });
        setUserCharacter(user.character);
    },[])

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className={"back"} onClick={() => history.push('/admin/dashboard')}>
                    <IonIcon slot="end" icon={arrowBackOutline}></IonIcon>
                    <a>Zurück</a>
                </div>
                <h2>
                    <LinearGradient gradient={['to right', '#BFB5F2 ,#8752F9']}>
                        Endergebnisse
                    </LinearGradient>
                </h2>

                <div className={"flexContainer"}>
                    {teams ? (
                        teams
                            .map(team => (
                                <div key={team.id}
                                     className={`teamContainer ${userCharacter === team.character.characterName ? 'userTeam' : ''}`}>
                                    <div className={"imageContainer"}>
                                        <img src={`../resources/media/${team.character.characterName}.png`} alt={team.character.characterName}
                                             className={"iconTeam"}/>
                                    </div>
                                    <div>
                                        <p>{team.teamName}</p>
                                        <p className={"punkte"}>{team.finalPoints} Punkte</p>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <p>loading...</p>
                    )}
                </div>
            </IonContent>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={error}
                duration={3000}
                className={ user ? 'tab-toast' : ''}
                cssClass="toast"
                style={{
                    '--toast-background': toastColor
                }}
            />
        </IonPage>
    )
        ;
};

export default Results;
