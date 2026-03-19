using Microsoft.AspNetCore.Mvc;
using GameTracker.API.Models;
using GameTracker.API.Data;
using System.Linq;

namespace GameTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{
    private AppDbContext _context;
    public GamesController(AppDbContext context)
    {
        _context = context;
    }
     [HttpGet]
    public IActionResult GetGames()
    {
        var games = _context.Games.ToList();
        return Ok(games);
    }
    [HttpPost]
    public IActionResult CreateGame([FromBody] Game newGame)
    {
        _context.Games.Add(newGame);
        _context.SaveChanges(); 
        return Ok(newGame);
    }
    [HttpDelete("{id}")]
    public IActionResult DeleteGame(int id)
    {
        var game = _context.Games.Find(id);
        
        if (game == null)
            return NotFound();

        _context.Games.Remove(game);
        _context.SaveChanges();
        return NoContent();
    }
}