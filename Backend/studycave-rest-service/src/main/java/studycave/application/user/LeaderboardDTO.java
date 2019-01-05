package studycave.application.user;

public class LeaderboardDTO {
	private String Username;
	private int points;
	
	public LeaderboardDTO(){
		
	}
	
	public String getUsername() {
		return Username;
	}
	
	public void setUsername(String username) {
		Username = username;
	}
	
	public int getPoints() {
		return points;
	}
	
	public void setPoints(int points) {
		this.points = points;
	}
	
}
