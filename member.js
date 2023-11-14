function skillsMember(){
    return {
        restrict: 'E',
        tempplateUrl: 'modules/skills/views/member.html',
        controller: 'SkillsMemeberController',
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            member: '='
        }

    };
}
