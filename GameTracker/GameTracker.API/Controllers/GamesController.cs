using Microsoft.AspNetCore.Mvc;
using GameTracker.API.Models;

namespace GameTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{
       private static List<Game> _games = new List<Game>
    {
        new Game { Id = 1, Title = "The Witcher 3", Genre = "RPG", Progress = 100, ReleaseDate = "2015-05-19" },
        new Game { Id = 2, Title = "Elden Ring", Genre = "Action RPG", Progress = 20, ReleaseDate = "2022-02-11" }
    }; 
    [HttpGet]
    public IActionResult GetGames() => Ok(_games);
    [HttpPost]
    public IActionResult CreateGame([FromBody] Game newGame)
    {
        newGame.Id = _games.Count + 1; 
        _games.Add(newGame);
        return Ok(newGame);
    }
}