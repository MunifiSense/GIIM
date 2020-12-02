import {BsStarFill} from 'react-icons/bs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {GiTwoHandedSword, GiPiercingSword, GiSpearHook, GiPocketBow, GiSecretBook} from 'react-icons/gi';

export function getItemImage(type, itemName) {
    if(type === 'Character'){
        return('https://muni.moe/images/genshin/Character_'+itemName+'_Thumb.png');
    }else if (type === 'Weapon'){
        return('https://muni.moe/images/genshin/Weapon_'+itemName.replace(/ /g, '_').replace(/'/g,'%27')+'.png');
    } else if (type === 'Item'){
        return('https://muni.moe/images/genshin/Item_'+itemName.replace(/ /g, '_').replace(/'/g,'%27')+'.png');
    } else if (type === 'Monster'){
        return('https://muni.moe/images/genshin/Enemy_'+itemName.replace(/ /g, '_').replace(/'/g,'%27')+'.png');
    } else{
        return('https://muni.moe/images/genshin/'+ type +'_'+itemName.replace(/ /g, '_').replace(/'/g,'%27')+'.png');
    }
}

export function getRarityGradient(rarity){
    if(rarity === 1){
        return ({
            background: 'rgb(79,88,100) linear-gradient(175deg, rgba(79,88,100,1) 0%, rgba(134,146,155,1) 100%)'
        });
    } else if(rarity === 2){
        return ({
            background: 'rgb(62,77,77) linear-gradient(175deg, rgba(62,77,77,1) 0%, rgba(97,151,111,1) 100%)'
        });
    } else if(rarity === 3){
        return ({
            background: 'rgb(81,84,116) linear-gradient(175deg, rgba(81,84,116,1) 0%, rgba(77,161,181,1) 100%)'
        });
    } else if(rarity === 4){
        return ({
            background: 'rgb(89,84,130) linear-gradient(175deg, rgba(89,84,130,1) 0%, rgba(185,136,202,1) 100%)'
        });
    } else if(rarity === 5){
        return ({
            background: 'rgb(105,84,83) linear-gradient(175deg, rgba(105,84,83,1) 0%, rgba(230,174,87,1) 100%)'
        });
    }
}

export function getRarityFrame(rarity){
    if(rarity === 1){
        return ({
            backgroundImage: `url("${getItemImage('Frame', "Common")}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            paddingBottom: '11.76%',
            height: '0px'
        });
    } else if(rarity === 2){
        return ({
            backgroundImage: `url("${getItemImage('Frame', "Uncommon")}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            paddingBottom: '11.76%',
            height: '0px'
        });
    } else if(rarity === 3){
        return ({
            backgroundImage: `url("${getItemImage('Frame', "Rare")}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            paddingBottom: '11.76%',
            height: '0px'
        });
    } else if(rarity === 4){
        return ({
            backgroundImage: `url("${getItemImage('Frame', "Epic")}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            paddingBottom: '11.76%',
            height: '0px'
        });
    } else if(rarity === 5){
        return ({
            backgroundImage: `url("${getItemImage('Frame', "Legendary")}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            paddingBottom: '11.76%',
            height: '0px'
        });
    }
}

export function getRarityStars(rarity){
    if(rarity === 1){
        return (
            <>
                <BsStarFill color='#ffcc32'/>
            </>
        );
    } else if(rarity === 2){
        return (
            <>
                <BsStarFill color='#ffcc32'/>
                <BsStarFill color='#ffcc32'/>
            </>
        );
    } else if(rarity === 3){
        return (
            <div style={{display: 'inline-block'}}>
                <BsStarFill color='#ffcc32'/>
                <BsStarFill color='#ffcc32'/>
                <BsStarFill color='#ffcc32'/>
            </div>
        );
    } else if(rarity === 4){
        return (
            <div style={{display: 'inline-block'}}>
                <BsStarFill color='#ffcc32'/>
                <BsStarFill color='#ffcc32'/>
                <BsStarFill color='#ffcc32'/>
                <BsStarFill color='#ffcc32'/>
            </div>
        );
    } else if(rarity === 5){
        return (
            <>
                <BsStarFill color='#ffcc32'/>
                <BsStarFill color='#ffcc32'/>
                <BsStarFill color='#ffcc32'/>
                <BsStarFill color='#ffcc32'/>
                <BsStarFill color='#ffcc32'/>
            </>
        );
    }
}

export function getWeaponTypeIcon(weaponType){
    if(weaponType === "Bow"){
        return(
            <OverlayTrigger
            placement='bottom'
            overlay={
            <Tooltip>
                {weaponType}
            </Tooltip>
        }
        >
            <GiPocketBow size='25' className='overlay-top' style={{borderRadius: '50%', padding: '3px'}}/>
            </OverlayTrigger>
            
        )
    } else if(weaponType === "Sword"){
        return(
            <OverlayTrigger
            placement='bottom'
            overlay={
            <Tooltip>
                {weaponType}
            </Tooltip>
        }
        >
            <GiTwoHandedSword size='25' className='overlay-top' style={{borderRadius: '50%', padding: '3px'}}/>
            </OverlayTrigger>   
        )
    } else if(weaponType === "Polearm"){
        return(
            <OverlayTrigger
            placement='bottom'
            overlay={
            <Tooltip>
                {weaponType}
            </Tooltip>
        }
        >
            <GiSpearHook size='25' className='overlay-top' style={{borderRadius: '50%', padding: '3px'}}/>
            </OverlayTrigger>   
        )
    } else if(weaponType === "Catalyst"){
        return(
            <OverlayTrigger
            placement='bottom'
            overlay={
            <Tooltip>
                {weaponType}
            </Tooltip>
        }
        >
            <GiSecretBook size='25' className='overlay-top' style={{borderRadius: '50%', padding: '3px'}}/>
            </OverlayTrigger>   
        )
    } else if(weaponType === "Claymore"){
        return(
            <OverlayTrigger
            placement='bottom'
            overlay={
            <Tooltip>
                {weaponType}
            </Tooltip>
        }
        >
            <GiPiercingSword size='25' className='overlay-top' style={{borderRadius: '50%', padding: '3px'}}/>
            </OverlayTrigger>              
        )
    }
}