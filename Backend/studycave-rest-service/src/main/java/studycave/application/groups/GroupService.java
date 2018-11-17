package studycave.application.groups;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.text.RandomStringGenerator;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import studycave.application.groups.members.SimpleStudyGroupMemberDTO;
import studycave.application.groups.members.StudyGroupMember;
import studycave.application.groups.members.StudyGroupMemberRepository;
import studycave.application.user.SimpleUserInfo;
import studycave.application.user.User;
import studycave.application.user.UserRepository;

@Service
public class GroupService {

	@Autowired
	ModelMapper modelMapper;
	@Autowired
	GroupRepository groupRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	StudyGroupMemberRepository memberRepository;

	public ResponseEntity<?> createGroup(CreateGroupDto groupDto) {
		StudyGroup group = modelMapper.map(groupDto, StudyGroup.class);
		RandomStringGenerator generator = new RandomStringGenerator.Builder()
		        .withinRange('0', 'z')
		        .filteredBy(Character::isLetterOrDigit)
		        .build();
		group.setGroupKey(generator.generate(10));
		Optional<User> owner = this.userRepository.findByUsername(groupDto.getOwner());
		if (!owner.isPresent()) {
			return new ResponseEntity("Invalid Owner",HttpStatus.BAD_REQUEST);
		}
		

	    List<StudyGroupMember> members = new ArrayList<>();
	    StudyGroupMember member = new StudyGroupMember();
	    member.setUser(owner.get());
	    member.setIsGroupLeader(true);
	    member.setGroup(group);
	    members.add(member);
	    group.setMembers(members);
	    
	    group = this.groupRepository.save(group);
	    GroupDto createdGroupDto = modelMapper.map(group, GroupDto.class);
	    createdGroupDto.setKey(group.getGroupKey());
	    createdGroupDto.setOwner(group.getMembers().get(0).getUser().getUsername());
	    return new ResponseEntity<GroupDto>(createdGroupDto, HttpStatus.OK);
	}
	
	public GroupInfoDto getGroupInfo(Long id) {
		StudyGroup group = new StudyGroup();
		group = this.groupRepository.findById(id).orElse(null);
		GroupInfoDto groupInfo = new GroupInfoDto();
		groupInfo.setId(group.getId());
		groupInfo.setName(group.getName());
		groupInfo.setDescription(group.getDescription());
		groupInfo.setGroupKey(group.getGroupKey());
		List<SimpleUserInfo> users = new ArrayList<>();
		for(StudyGroupMember m : group.getMembers()) {
			SimpleUserInfo u = new SimpleUserInfo();
			u.setId(m.getUser().getId());
			u.setUsername(m.getUser().getUsername());
			users.add(u);
		}
		groupInfo.setUsers(users);
		return groupInfo ;
	}
	
	public ResponseEntity deleteUserFromGroup(Long gId, Long pId) {
		StudyGroupMember user = new StudyGroupMember();
		user = this.memberRepository.findUserInGroup(gId,pId);
		this.memberRepository.delete(user);
		return new ResponseEntity(HttpStatus.OK);
		
	}
	
	public ResponseEntity deleteGroup(Long id) {
		StudyGroup group = new StudyGroup();
		group = this.groupRepository.findById(id).orElse(null);
		this.groupRepository.delete(group);
		return new ResponseEntity(HttpStatus.OK);
	}
	
	public String generateCode(Long id) {
		StudyGroup group = new StudyGroup();
		group = this.groupRepository.findById(id).orElse(null);
		RandomStringGenerator generator = new RandomStringGenerator.Builder()
		        .withinRange('0', 'z')
		        .filteredBy(Character::isLetterOrDigit)
		        .build();
		group.setGroupKey(generator.generate(10));
		return group.getGroupKey();}

	public List<SimpleStudyGroupMemberDTO> getMyGroups(Long id){
	// User user = new User();
	// user = this.userRepository.findByUsername(username).orElse(null);
	List<StudyGroupMember> groups = new ArrayList<>(); 
	groups = this.memberRepository.findByMember(id);
	List<SimpleStudyGroupMemberDTO> simplegroups = new ArrayList<>();
	for (StudyGroupMember g : groups) {
		SimpleStudyGroupMemberDTO s = new SimpleStudyGroupMemberDTO();
		s.setName(g.getGroup().getName());
		s.setId(g.getGroup().getId());
		if(g.getIsGroupLeader() == true)
			s.setRole("OWNER");
		else
			s.setRole("MEMBER"); 
		simplegroups.add(s);
		}
	return simplegroups;
	}
}
