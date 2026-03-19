using Microsoft.AspNetCore.Mvc;
using GameTracker.API.Models;

namespace GameTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{
       private static List<Game> _games = new List<Game>
    {
        new Game { Id = 1, Title = "The Witcher 3", Genre = "RPG", Progress = 100, ReleaseDate = "2015-05-19", Rating = 6, Description = "An epic open-world RPG following Geralt of Rivia on his quest to find his adopted daughter." },
        new Game { Id = 2, Title = "Elden Ring", Genre = "Action RPG", Progress = 20, ReleaseDate = "2022-02-11", Rating = 6, Description = "An action RPG set in the world of Elden Ring, where players explore a vast open world and face challenging enemies." }
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