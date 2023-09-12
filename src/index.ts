import App from './components/app/app';
import './global.scss';

const app = new App();

// EventDelegator.addDelegatedListener('click', document.body, () => {
//   console.log('work');
// });

app.testProductAPI();
app.start();
//app.testProductAPI();

// app.testCardAPI();
