import React from "react";
import styles from "./styles.module.css";

const HealthBar = ({label, health, maxHealth}) => {
    return(
        <div className={styles.main}>
            <div className={styles.label}>{label}</div>
            <div className={styles.max}>
                <div className={styles.value} style={{width: `${(health/maxHealth)* 100}%`}}></div>
            </div>
        </div>
    )
}

export default HealthBar;
// export default class HealthBar extends React.Component {
//     // constructor(props){
//     //     super(props);
//     // }

//     render(){
//         return(
//             <div className={styles.main}>
//                 <div className={styles.label}>{this.props.label}</div>
//                 <div className={styles.max}>
//                     <div className={styles.value} style={{width: `${(this.props.health/this.props.maxHealth)* 100}%`}}></div>
//                 </div>
//             </div>
//         )
//     }
// }