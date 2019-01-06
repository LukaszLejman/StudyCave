package studycave.application.user;

public class LeaderboardDTO implements Comparable {
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
	

	  @Override
	  public int compareTo(Object o) {
	    int result = this.getUsername().compareTo(((LeaderboardDTO) o).getUsername());
	        if(result == 0) {
	            result = (this.getPoints() < ((LeaderboardDTO) o).getPoints() ? -1 : (this.getPoints() == ((LeaderboardDTO) o).getPoints() ? 0 : 1));
	        }
	        return  result;
	 }
}
