import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CardForecast = ({data}) => {
  const iconBaseUrl = 'https://openweathermap.org/img/wn/';
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const date = new Date(data.date);
  const dayOfWeekNumber = date.getDay();
  const dayName = daysOfWeek[dayOfWeekNumber];
    return (
        <Card sx={{ width: 110 }}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              {dayName}
            </Typography>
            <Box
               component="img"
               alt={data.description}
               src={`${iconBaseUrl}${data.icon}@2x.png`}
               sx={{margin: "0 auto", maxWidth: 36}}
            />
            
            <Typography variant="body2">
              min: {Math.round(data.tempMin)} °C
              <br />
              max: {Math.round(data.tempMax)} °C
            </Typography>
          </CardContent>
        </Card>
      );
}

export default CardForecast