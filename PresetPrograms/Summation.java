import java.util.ArrayList;
import java.util.Random;

class Summation {
	
	public static int sum(ArrayList<Integer> list) {
		int total = 0;
		for (int i = 0; i < list.size(); i++) {
			total += list.get(i);
		}
		return total;
	}
	
	public static void main(String[] args) {
		Random random = new Random();
		ArrayList<Integer> list = new ArrayList<Integer>();
		System.out.print("List: ");
		for (int i = 0; i < 20; i++) {
			list.add(random.nextInt(100));
			System.out.print(list.get(i) + " ");
		}
		System.out.println();
		
		System.out.println("Total Sum: " + sum(list));
	}
	
}