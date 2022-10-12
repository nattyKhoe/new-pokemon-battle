import styles from './styles.module.css';


const ChoiceMenu = ({onAttack, onSwitch, onSpecialAttack, inSeq}) =>{
    return(
        <div className={styles.main}>
            <div onClick={inSeq ?null :onAttack} className={inSeq? styles.deactivate :styles.option}>Attack</div>
            <div onClick={inSeq ?null :onSpecialAttack} className={inSeq? styles.deactivate :styles.option}>Special Attack</div>
            <div onClick={inSeq ?null :onSwitch} className={inSeq? styles.deactivate :styles.option}>Swap</div>
        </div>
    )
}
     
export default ChoiceMenu;
