'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Group {
  id: number;
  members: string[];
}

export default function GroupDivider() {
  const [memberNames, setMemberNames] =
    useState('영주, 민지, 지아, 다희, 희승');
  const [numberOfGroups, setNumberOfGroups] = useState('2');
  const [membersPerGroup, setMembersPerGroup] = useState('3');
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState('');

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const divideGroups = () => {
    setError('');

    if (!memberNames.trim()) {
      setError('멤버 이름을 입력해주세요');
      return;
    }

    const members = memberNames
      .split(',')
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (members.length === 0) {
      setError('올바른 멤버 이름을 입력해주세요');
      return;
    }

    const numGroups = Number.parseInt(numberOfGroups);
    const numMembersPerGroup = Number.parseInt(membersPerGroup);

    if (!numGroups || numGroups <= 0) {
      setError('올바른 조 개수를 입력해주세요');
      return;
    }

    if (!numMembersPerGroup || numMembersPerGroup <= 0) {
      setError('올바른 조별 인원수를 입력해주세요');
      return;
    }

    if (numGroups * numMembersPerGroup > members.length) {
      setError('설정한 조 구성에 비해 멤버가 부족해요');
      return;
    }

    const shuffledMembers = shuffleArray(members);

    const newGroups: Group[] = [];
    let memberIndex = 0;

    for (let i = 0; i < numGroups; i++) {
      const groupMembers: string[] = [];

      for (
        let j = 0;
        j < numMembersPerGroup && memberIndex < shuffledMembers.length;
        j++
      ) {
        groupMembers.push(shuffledMembers[memberIndex]);
        memberIndex++;
      }

      if (groupMembers.length > 0) {
        newGroups.push({
          id: i + 1,
          members: groupMembers,
        });
      }
    }

    setGroups(newGroups);
  };

  const resetForm = () => {
    setMemberNames('영주, 민지, 지아, 다희, 희승');
    setNumberOfGroups('2');
    setMembersPerGroup('3');
    setGroups([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-sky-100 p-4">
      <div className="mx-auto max-w-4xl space-y-8 pt-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            🌿 코테스터디 파이썬 코드리뷰 조짜기 🌿
          </h1>
          <p className="text-lg text-green-700">
            알고리즘 스터디를 위한 랜덤 조 나누기
          </p>
        </div>

        <Card className="shadow-lg border-2 border-green-200 bg-white">
          <CardHeader className="bg-green-50 rounded-t-lg">
            <CardTitle className="text-2xl text-center text-green-800">
              조 설정하기
            </CardTitle>
            <CardDescription className="text-center text-base text-green-600">
              멤버 이름과 조 구성을 입력해주세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-3">
              <Label
                htmlFor="members"
                className="text-lg font-semibold text-green-800"
              >
                멤버 이름
              </Label>
              <Input
                id="members"
                placeholder="영주, 민지, 지아, 다희, 희승"
                value={memberNames}
                onChange={(e) => setMemberNames(e.target.value)}
                className="w-full text-base p-4 rounded-xl border-2 border-green-200 focus:border-green-400"
              />
              <p className="text-sm text-green-600">
                쉼표로 구분해서 입력해주세요
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label
                  htmlFor="numGroups"
                  className="text-lg font-semibold text-green-800"
                >
                  조 개수
                </Label>
                <Input
                  id="numGroups"
                  type="number"
                  min="1"
                  placeholder="2"
                  value={numberOfGroups}
                  onChange={(e) => setNumberOfGroups(e.target.value)}
                  className={`text-base p-4 rounded-xl border-2 border-green-200 focus:border-green-400 ${
                    !numberOfGroups ? 'text-gray-400' : 'text-black'
                  }`}
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="membersPerGroup"
                  className="text-lg font-semibold text-green-800"
                >
                  조별 인원수
                </Label>
                <Input
                  id="membersPerGroup"
                  type="number"
                  min="1"
                  placeholder="3"
                  value={membersPerGroup}
                  onChange={(e) => setMembersPerGroup(e.target.value)}
                  className={`text-base p-4 rounded-xl border-2 border-green-200 focus:border-green-400 ${
                    !membersPerGroup ? 'text-gray-400' : 'text-black'
                  }`}
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200">
                <p className="text-red-600 font-medium text-center">{error}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={divideGroups}
                className="flex-1 text-lg py-6 rounded-xl bg-green-500 text-white"
              >
                조 나누기 ✨
              </Button>
              <Button
                variant="outline"
                onClick={resetForm}
                className="text-lg py-6 rounded-xl border-2 border-green-300 text-green-700 bg-white"
              >
                초기화 🔄
              </Button>
            </div>
          </CardContent>
        </Card>

        {groups.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-green-800">
              🎉 조 나누기 결과 🎉
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <Card
                  key={group.id}
                  className="border-2 border-green-200 shadow-lg bg-white"
                >
                  <CardHeader className="pb-3 bg-green-50 rounded-t-lg">
                    <CardTitle className="text-xl text-center text-green-800">
                      {group.id}조
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {group.members.map((member, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-200"
                        >
                          <div className="h-3 w-3 rounded-full bg-green-400" />
                          <span className="font-medium text-green-800">
                            {member}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <footer className="text-center py-8 mt-12">
          <div className="bg-white rounded-2xl p-6 border-2 border-green-200">
            <p className="text-green-600 text-sm">
              유레카 프론트엔드 2기 멤버들의 알고리즘 스터디를 위한 조
              프로그램입니다
            </p>
            <p className="text-green-700 font-semibold mt-2">
              Made with v0 by @abyss-s
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
