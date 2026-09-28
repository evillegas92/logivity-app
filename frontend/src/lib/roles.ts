import PackageIcon from '@lucide/svelte/icons/package';
import TruckIcon from '@lucide/svelte/icons/truck';

/**
 * The two sides of the marketplace. The active role comes from the URL
 * (`/shipper/...` or `/carrier/...`), so each browser tab can use a different role.
 */
export type Role = 'shipper' | 'carrier';

export interface RoleInfo {
	id: Role;
	label: string;
	description: string;
	/** Root of the role's section of the app. */
	href: `/${Role}`;
	icon: typeof PackageIcon;
}

export const roles: Record<Role, RoleInfo> = {
	shipper: {
		id: 'shipper',
		label: 'Shipper',
		description: 'Post shipments and review the bids carriers place on them.',
		href: '/shipper',
		icon: PackageIcon
	},
	carrier: {
		id: 'carrier',
		label: 'Carrier',
		description: 'Browse open shipments and bid to transport them.',
		href: '/carrier',
		icon: TruckIcon
	}
};
