'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Route.on('/').render('welcome')
//Route.get('createUser', 'FilaController.CadastrarUsuario');
Route.get('createUser', 'FilaController.CadastrarUsuario');
Route.get('addToLine', 'FilaController.AdicionarAFila');
Route.get('findPosition', 'FilaController.BuscarPorEmail');
Route.get('showLine', 'FilaController.VerFila');
Route.get('filterLine', 'FilaController.FiltrarPorGenero');
Route.get('popLine', 'FilaController.TirarDaFila');
//Route.post('createUser', 'FilaController.CadastrarUsuario');
