namespace GameTracker.API.Models
{
    public class Game
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Genre { get; set; } = string.Empty;
        public int Progress { get; set; }
        public DateTime ReleaseDate { get; set; }
        public bool IsCompleted => Progress == 100;
        public string Description {get; private set;}
    }
}