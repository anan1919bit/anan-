
//#include<iostream>
//#include<string>
//using namespace std;
//string add(string a, string b)
//{
//	int i = a.size() - 1;
//	int j = b.size() - 1;
//	int carry = 0;
//	string res = "";
//	while (i>=0||j>=0||carry>0)
//	{
//		int n1 = 0;
//		if (i >= 0)
//		{
//			n1 = a[i] - '0';
//			i--;
//		}
//		int n2 = 0;
//		if (j >= 0)
//		{
//			n2 = b[j] - '0';
//			j--;
//		}
//		int sum = n1 + n2+carry;
//		carry = sum / 10;
//		char c = (sum % 10) + '0';
//		res = c + res;
//	}
//	return res;
//}
//string jian(string a, string b)
//{
//	int i = a.size()-1;
//	int j = b.size()-1;
//	string res = "";
//	int borrow = 0;
//	while (i >= 0)
//	{
//		int n1 = 0;
//			if (i >= 0)
//			{
//				n1 = a[i] - '0';
//			}
//			int n2 = 0;
//			if (j >= 0)
//			{
//				n2 = b[j] - '0';
//			}
//			int n = n1 - n2-borrow;
//			if (n < 0)
//			{
//				n += 10;
//				borrow = 1;
//			}
//			else
//				borrow = 0;
//			char c = n + '0';
//			res = c + res;
//			i--, j--;
//	}
//	return res;
//}
//int main()
//{
//	string a, b;
//	cout << "输入两个整数:" << endl;
//	cin >> a;
//	cin >> b;
//	cout << "1:加法操作:\n2:减法操作:" << endl;
//	int n;
//	cin >> n;
//	if (n == 1)
//		cout<<add(a, b)<<endl;
//	else if (n == 2)
//		cout<<jian(a, b)<<endl;
//	else
//		cout << "输入错误!" << endl;
//}