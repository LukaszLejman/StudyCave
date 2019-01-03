package studycave.application.user;

import javax.swing.ImageIcon;

public class UserBadgeDTO {
	private ImageIcon icon;
	private String badgeName;
	private Boolean unlocked;
	
	public UserBadgeDTO(){
		
	}

	public ImageIcon getIcon() {
		return icon;
	}

	public void setIcon(ImageIcon icon) {
		this.icon = icon;
	}

	public String getBadgeName() {
		return badgeName;
	}

	public void setBadgeName(String badgeName) {
		this.badgeName = badgeName;
	}

	public Boolean getUnlocked() {
		return unlocked;
	}

	public void setUnlocked(Boolean unlocked) {
		this.unlocked = unlocked;
	}
	
	
}
