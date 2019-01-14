package studycave.application.userActivity;

public class UserActivityDTO {
	private Long id;
	
	private String type;
	
	private float points;
	
	private String comment;
	
	private String date;
	
	private String resourceType;
	
	private String resourceName;
	
	private String from;
	
	private String to;

	
	
	public UserActivityDTO(Long id, String type, float points, String comment, String date, String resourceType,
			String resourceName, String from, String to) {
		super();
		this.id = id;
		this.type = type;
		this.points = points;
		this.comment = comment;
		this.date = date;
		this.resourceType = resourceType;
		this.resourceName = resourceName;
		this.from = from;
		this.to = to;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public float getPoints() {
		return points;
	}

	public void setPoints(float points) {
		this.points = points;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getResourceType() {
		return resourceType;
	}

	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}
	
	
}
