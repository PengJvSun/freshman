import dva from 'dva';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import appModel from './module/app/models';

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError: error => {
    console.log(error);
  }
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(appModel);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

const App = app.start();

ReactDOM.render(<App />, document.getElementById('root'));

export default app;
