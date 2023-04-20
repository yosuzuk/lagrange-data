import { IPlayerPlatform } from '../types/IMapContent';
import { Station } from './Station';

interface IProps {
    platform: IPlayerPlatform;
}

export const PlayerPlatform = (props: IProps) => {
    const { platform } = props;

    return (
        <Station station={platform.station} />
    );
};
