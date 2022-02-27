import { useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '../../container/Container';
import { ShipDetail } from '../../shipDetail/ShipDetail';
import { isValidShipId } from '../../../data/shipIds';
import { NavigationBar } from '../../navigation/NavigationBar';
import { ShipDetailActionBar } from './ShipDetailActionBar';

export const ShipDetailPage = () => {
    const { shipId } = useParams();
    const navigate = useNavigate();

    const handleClickShip = useCallback((shipId: string) => {
        navigate(`/shipData/${shipId}`);
    }, [navigate]);

    return (
        <>
            <NavigationBar currentRoute="/shipData" />
            <ShipDetailActionBar />
            <Container>
                <Box p={1}>
                    <Paper>
                        {shipId && isValidShipId(shipId) ? (
                            <ShipDetail shipId={shipId} onClickShip={handleClickShip} />
                        ) : (
                            <Typography variant="body1">{'Invalid ID'}</Typography>
                        )}
                    </Paper>
                </Box>
            </Container>
        </>
    );
};

export default ShipDetailPage;
